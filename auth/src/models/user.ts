import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the custom properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  //Generics -> providing custom types as arguments "<UserDoc>"" to an interface
  build(attrs: UserAttrs): UserDoc; //function that takes attributes of type UserAttrs & returns UserDoc type
}

// An interface that describes the properties
// that a User Document has
// might be different from the properties that are required to create a new User
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    //override the default JSON.stringify method
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password; //removes the password when JSON.stringify is called i.e. when returning the user to the browser on signup/signin/currentUser
        delete ret.__v;
      },
    },
  }
);

// this is the alternative approach to the above "toJSON":
// userSchema.methods.toJSON = function () {
//   const user = this;

//   const userObject = user.toObject();

//   userObject.id = userObject._id;
//   delete userObject._id;
//   delete userObject.password; //removes the password when JSON.stringify is called i.e. when returning the user to the browser on signup/signin/currentUser
//   delete userObject.__v;

//   return userObject;
// };

// mongoose middleware - executed every time a user is saved to the DB
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    // only hash the password if it is modified or created for the first time
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

// custom property on the User model
// creates a user with const user = User.build({email:'t@t.t',password:'1234'})
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema); //Generics -> providing custom types as arguments "<UserDoc, UserModel>"" to a function

export { User };
