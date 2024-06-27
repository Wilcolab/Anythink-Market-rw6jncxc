const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/", async (req, res) => {
/**
 * Retrieves all comments from the database.
 * @type {Array<Object>} An array of comment objects.
 */
  const comments = await Comment.find();
  res.json(comments);
});

//a function that is deleting a comment
router.delete("/:id", (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" });
        } else if (!comment) {
            res.status(404).json({ error: "Comment not found" });
        } else {
            comment.remove((err) => {
                if (err) {
                    res.status(500).json({ error: "Internal server error" });
                } else {
                    res.json({ success: true });
                }
            });
        }
    });
})
