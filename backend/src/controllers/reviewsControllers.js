const {client} = require('../db');

module.exports.addNewReview = async (req, res) => {
  try {

    console.log(req.body);

    const comment = req.body.comments;
    const rating = req.body.rating;
    const tRegId = req.body.tRegId;
    const sRegId = req.user.id;
    const courseId = req.body.cId;

    const insertData = 'INSERT INTO reviews (s_reg_id, t_reg_id, comment, rating, c_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const insertValue = [sRegId, tRegId, comment, rating, courseId];
    const insertResult = await client.query(insertData, insertValue);
    const updateQuery = 'UPDATE reqs_handling SET value = true WHERE c_id = $1';
    const updateValues = [courseId];
    await client.query(updateQuery, updateValues);

    res.status(201).send('Review added successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error occurred' });
  }
};

module.exports.getReviews = async (req, res) => {
  try {
    const query = `
      SELECT reviews.*, 
             CASE 
               WHEN reviews.s_reg_id = $1 THEN tutor_info.t_name 
               ELSE student_info.s_Fname  
             END AS reviewer_name 
      FROM reviews 
      LEFT JOIN student_info ON reviews.s_reg_id = student_info.s_reg_id 
      LEFT JOIN tutor_info ON reviews.t_reg_id = tutor_info.t_reg_id 
      WHERE reviews.s_reg_id = $1 OR reviews.t_reg_id = $1
    `;
    const result = await client.query(query, [req.user.id]);
    
    if (result.rows.length > 0) {
      let totalRatings = 0;
      result.rows.forEach(review => {
        totalRatings += review.rating;
      });
      const averageRating = totalRatings / result.rows.length;
      
      res.status(200).json({ reviews: result.rows, averageRating });
    } else {
      res.status(200).json({ message: 'Reviews not found', averageRating: 0 });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Server error occurred' });
  }
};


module.exports.getReviewsStudent = async (req, res) => {
  try {
    const sRegId = req.user.id;
    const query = 'SELECT * FROM reviews WHERE s_reg_id = $1 OR t_reg_id= $2';
    const result = await client.query(query, [req.user.id]);
    let reviewed=true;
    if (result.rows.length > 0) {
      res.status(200).json({ result: result.rows });
      
    } else {
      res.status(404).json({ message: 'no response found'});
    }
  } catch (e) {
    res.status(500).json({ error: 'Server error occurred' });
  }
};

















  
    



