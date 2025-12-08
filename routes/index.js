var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.render("index", { title: "Home" });
});

router.get("/menu", function(req, res) {
  res.render("menu", { title: "Menu" });
});

router.get("/about", function(req, res) {
  res.render("about", { title: "About Us" });
});

router.get("/comments", function(req, res) {
  req.db.query("SELECT * FROM comments;", function(err, results) {
    if (err) {
      return res.send("Error loading comments");
    }
    res.render("comments", { title: "Comments", comments: results });
  });
});

router.post("/comments", function(req, res) {
  var name = req.body.name;
  var message = req.body.message;

  req.db.query(
    "INSERT INTO comments (name, message) VALUES (?, ?);",
    [name, message],
    function(err) {
      if (err) {
        return res.send("Error saving comment");
      }
      res.redirect("/comments");
    }
  );
});

module.exports = router;