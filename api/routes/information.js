const router = require("express").Router();
const User = require("../models/Users");
const Information = require("../models/Information");
//give input of profile information


router.post("/info", async (req, res) => {
    const newPost = new Information(req.body);
    console.log("newPost", newPost);
    try {
      const savedPost = await newPost.save();

      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //get info by id
  router.get("/info/:id", async (req, res) => {
    try {
      const post = await Information.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });






//update info by id 
  router.put("/info/:id", async (req, res) => {
    try {
     // const post = await Information.findById(req.params.id);
     
        try {
          const updatedPost = await Information.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      
    } catch (err) {
      res.status(500).json(err);
    }
  });

//delete info by id
router.delete("/info/:id", async (req, res) => {
  try {
    const updatedPost = await Information.findByIdAndDelete(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log("updatedPost", updatedPost)
        res.status(200).json("info has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
   
  
});


//get all user info

router.get("/info/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  
  try {
    let posts;
    if (username) {
      posts = await Information.find({ username });
    } else if (catName) {
      posts = await Information.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Information.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

  
module.exports = router;