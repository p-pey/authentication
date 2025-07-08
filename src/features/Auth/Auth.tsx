"use client";

import styles from "./styles/Auth.module.scss";
import useAuth from "./useAuth";

export default function AuthPage() {
  const authHook = useAuth();
  return (
    <section className={styles.AuthContainer}>
      <div className={styles.FormWrapper}>
        <h4 className={styles.Title}>Login</h4>
        <form
          className={styles.Form}
          onSubmit={authHook.handleSubmit(authHook.onSubmit)}
        >
          <div className={styles.FormGroup}>
            <label className={styles.Label}>Email</label>
            <input className={styles.Input} />
            <span className={styles.Error}></span>
          </div>
          <div className={styles.FormGroup}>
            <label className={styles.Label}>Password</label>
            <input className={styles.Input} />
            <span className={styles.Error}></span>
          </div>
          <button className={styles.Button}>Login</button>
        </form>
      </div>
    </section>
  );
}
