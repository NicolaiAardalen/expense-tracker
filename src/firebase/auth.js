import { auth } from "./firebase";

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  updatePassword, 
  sendEmailVerification, 
  updateProfile, 
  verifyBeforeUpdateEmail, 
  reauthenticateWithCredential, 
  EmailAuthProvider 
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password, displayName) => {
  // 1. Create the user
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  // 2. Update display name
  if (displayName) {
    await updateProfile(userCredential.user, {
      displayName: displayName
    });
  }

  return userCredential;
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  console.log("Signing in with:", { email, password });
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};

export const doUpdateEmailAndUsername = async (email, displayName, currentPassword) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is logged in");

  // Reauthenticate
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);

  // ✅ Only update email if it's provided *and different*
  if (email && email.trim() !== "" && email.trim() !== user.email) {
    await verifyBeforeUpdateEmail(user, email.trim(), {
      url: `${window.location.origin}/home`,
    });
    return { message: "Verification email sent to the new email. Please confirm before email is updated." };
  }

  // ✅ Update username if changed
  if (displayName && displayName.trim() !== "" && displayName.trim() !== user.displayName) {
    await updateProfile(user, { displayName: displayName.trim() });
  }

  return user;
};