const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryId: { type: Number, unique: true, required: false },
  categoryName: { type: String, unique: true, required: true },
});

// Apply auto-increment to the categoryId field
categorySchema.plugin(AutoIncrement, { inc_field: "categoryId" });
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
