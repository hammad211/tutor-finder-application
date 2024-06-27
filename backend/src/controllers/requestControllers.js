const {client} = require ('../db');
const value = require("../statusValues/status")


module.exports.updateCourseRequest = async (req, res) => { // update req by teacher with status accepted
  try {
    const t_reg_id = req.user.id;
    const { slots, id } = req.body;

    for (const day in slots) {
      for (const slotId of slots[day]) {
        const updateTimeSlotQuery = `
          UPDATE reqslots
          SET status = 'accepted'
          WHERE s_reg_id = $1 AND t_reg_id = $2 AND status = $3;`;
        const updateTimeSlotValues = [id, t_reg_id, 'pending'];
        await client.query(updateTimeSlotQuery, updateTimeSlotValues);
      }
    }

    const checkConversationQuery = `
      SELECT * FROM conversations
      WHERE members = ARRAY[$1::integer, $2::integer]`; // Convert values to integers
    const checkConversationValues = [parseInt(t_reg_id), parseInt(id)]; // Convert values to integers
    const existingConversation = await client.query(checkConversationQuery, checkConversationValues);

    if (existingConversation.rows.length === 0) {
      const insertConversationQuery = `
        INSERT INTO conversations (members)
        VALUES (ARRAY[$1::integer, $2::integer])
        RETURNING *`;
      const insertConversationValues = [parseInt(t_reg_id), parseInt(id)]; // Convert values to integers
      await client.query(insertConversationQuery, insertConversationValues);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error occurred' });
  }
};

module.exports.getCourseRequest = async (req, res) => { // Showing student request on teacher side
  try {
    console.log("called12");

    const t_reg_id = req.user.id;
    const query = `
      SELECT 
        rs.day, 
        TO_CHAR(rs.start_time, 'HH24') AS start_hour, 
        rs.subject, 
        rs.t_reg_id AS t_reg_id,
        rs.status, -- Include the status column from the database
        si.*, 
        img.ima AS image_data
      FROM 
        reqslots rs
      JOIN 
        student_info si ON rs.s_reg_id = si.s_reg_id
      JOIN
        image img ON rs.t_reg_id = img.use_id
      WHERE 
        rs.t_reg_id = $1 AND (rs.status = 'pending' OR rs.status = 'accepted');

    `;

    const values = [t_reg_id]; 
    const result = await client.query(query, values);
    
    const groupedData = result.rows.reduce((acc, row) => {
      const { day, start_hour, subject, t_reg_id, status, ima, ...studentInfo } = row;
      if (!acc.selectedSlots[day]) {
        acc.selectedSlots[day] = [];
      }
      acc.selectedSlots[day].push({ start_hour: Number(start_hour), subject, t_reg_id, status }); 
  
      acc.studentInfo = { ...acc.studentInfo, [t_reg_id]: { ...studentInfo, t_reg_id, ima, status } };
      return acc;
    }, { selectedSlots: {}, studentInfo: {} });
    console.log(groupedData)
    res.status(200).json({
      success: true,
      data: groupedData,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error occurred' });
  }
};

module.exports.getCourseRequest3 = async (req, res) => { 
  try {
    console.log("called12", req.user.id);

    const t_reg_id = req.user.id;
    const query = `
      SELECT 
        rs.day, 
        TO_CHAR(rs.start_time, 'HH24') AS start_hour, 
        rs.subject, 
        rs.t_reg_id AS t_reg_id,
        rs.status,
        rs.c_id,  -- Ensure c_id is selected
        si.*, 
        img.ima AS image_data
      FROM 
        (SELECT DISTINCT ON (s_reg_id) s_reg_id, s_fname, s_lname, s_gender, s_number, s_address FROM student_info) si
      JOIN 
        reqslots rs ON rs.s_reg_id = si.s_reg_id
      JOIN
        image img ON rs.s_reg_id = img.use_id
      WHERE 
        rs.t_reg_id = $1;
    `;

    const values = [t_reg_id]; 
    const result = await client.query(query, values);
    
    let groupedData = { 
      selectedSlots: {
        pending: [],
        accepted: [],
        completed: []
      }, 
      tutorInfo: { 
        pending: [], 
        accepted: [], 
        completed: [] 
      } 
    };

    let requestCounts = { accepted: 0, pending: 0, completed: 0 };

    let uniqueCIds = { pending: new Set(), accepted: new Set(), completed: new Set() };

    result.rows.forEach(row => {
      const { day, start_hour, subject, t_reg_id, status, ima, s_reg_id, c_id, ...studentInfo } = row;
      const slot = { 
        start_hour: Number(start_hour),
        day, 
        subject, 
        t_reg_id, 
        status,
        s_reg_id,
        c_id  // Include c_id in the slot object
      }; 

      groupedData.selectedSlots[status].push(slot);

      // Check if c_id is unique for the current status
      if (!uniqueCIds[status].has(c_id)) {
        // Add c_id to the set of unique IDs for the current status
        uniqueCIds[status].add(c_id);

        // Push data into the corresponding array in tutorInfo
        groupedData.tutorInfo[status].push({ ...studentInfo, t_reg_id, ima, status, s_reg_id, c_id });
        requestCounts[status]++;
      }
    });

    // Add accepted requests that might not have been counted
    result.rows.forEach(row => {
      const { status, c_id } = row;
      if (status === 'accepted' && !uniqueCIds.accepted.has(c_id)) {
        requestCounts.accepted++;
      }
    });

    res.status(200).json({
      success: true,
      data: groupedData,
      requestCounts: requestCounts 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error occurred' });
  }
};


//reject the request by sending the id from front end
module.exports.deleteRecordById = async (req, res) => {
  console.log("call");
  console.log(req.body.id);
  try {
    const s_reg_id = req.body.id;
    const t_reg_id = req.user.id;
    const deleteQuery =
      "DELETE FROM reqSlots WHERE s_reg_id = $1 AND t_reg_id = $2 AND (status = 'pending' OR status = 'accepted') RETURNING day, start_time";
    const deleteResult = await client.query(deleteQuery, [s_reg_id, t_reg_id]);

    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ error: "No Record Found." });
    }

    const updateValues = deleteResult.rows.map((row) => [
      row.day,
      row.start_time,
    ]);

    for (const slot of updateValues) {
      const [day, start_time] = slot;

      // Check if start_time is defined
      if (start_time) {
        const formattedStartTime = start_time;
        const query = `
      UPDATE time_slots 
      SET value = false 
      WHERE user_id = $1 AND day = $2 AND start_time = $3 AND value = $4
      RETURNING *;
    `;
        const values = [t_reg_id, day, formattedStartTime, true];
        await client.query(query, values);
      } else {
        console.error("Invalid start_time:", slot);
      }
    }

    res.status(200).json({ message: "Record deleted successfully." });
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.endRequest = async (req, res) => {
  console.log("endRequest called");
  try {
    const s_reg_id = req.body.id;
    const t_reg_id = req.user.id;
    const updateTimeSlotQuery = `
      UPDATE reqslots 
      SET status = 'completed' 
      WHERE s_reg_id = $1 AND t_reg_id = $2 AND status = $3 
      RETURNING day, start_time, c_id`;
    const updateResult = await client.query(updateTimeSlotQuery, [s_reg_id, t_reg_id, 'accepted']);

    if (updateResult.rows.length === 0) {
      return res.status(404).json({ error: 'No Record Found.' });
    }
    
    const updateValues = updateResult.rows.map(row => [row.day, row.start_time]);

    const { day, start_time, c_id } = updateResult.rows[0];

for (const slot of updateValues) {
  const [day, start_time] = slot;
  
  // Check if start_time is defined
  if (start_time) {
    const formattedStartTime = start_time;
    const query = `
      UPDATE time_slots 
      SET value = false 
      WHERE user_id = $1 AND day = $2 AND start_time = $3 AND value = $4
      RETURNING *;
    `;
    const values = [t_reg_id, day, formattedStartTime, true];
    const result = await client.query(query, values);
  } else {
    console.error('Invalid start_time:', slot);
  }
}

const insertReviewQuery = 'INSERT INTO reqs_handling (s_reg_id, t_reg_id, c_id, value) VALUES ($1, $2, $3, $4)';
const insertReviewValues = [s_reg_id, t_reg_id, c_id, 'false'];

try {
  await client.query(insertReviewQuery, insertReviewValues);
} catch (error) {
  console.error('Error inserting review:', error);
}

    res.status(200).json({ message: 'Request Completed successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};























  
    



