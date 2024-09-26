import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ContactSchema.index({ userId: 1, contactId: 1 }, { unique: true });

const Contacts = mongoose.model('Contact', ContactSchema);

export default Contacts;
