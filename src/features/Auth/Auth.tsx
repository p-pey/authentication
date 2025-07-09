"use client";

import classNames from "classnames";
import styles from "./styles/Auth.module.scss";
import useAuth from "./useAuth";

export default function AuthPage() {
  const authHook = useAuth();
  return (
    <section className={styles.AuthContainer}>
      <div className={styles.FormWrapper}>
        <h4 className={styles.Title}>Login</h4>
        {!!authHook.formMessage && (
          <div
            className={classNames(styles.FormMessage, {
              [styles.error]: authHook.formMessage.type === "ERROR",
              [styles.success]: authHook.formMessage.type === "SUCCESS",
            })}
          >
            {authHook.formMessage.message}
          </div>
        )}
        <form
          className={styles.Form}
          onSubmit={authHook.handleSubmit(authHook.onSubmit)}
        >
          <div className={styles.FormGroup}>
            <label className={styles.Label}>Email</label>
            <input className={styles.Input} {...authHook.register("email")} />
            <span className={styles.Error}>
              {authHook.errors.email?.message}
            </span>
          </div>
          <div className={styles.FormGroup}>
            <label className={styles.Label}>Password</label>
            <input
              type="password"
              className={styles.Input}
              {...authHook.register("password")}
            />
            <span className={styles.Error}>
              {authHook.errors.password?.message}
            </span>
          </div>
          <button className={styles.Button}>Login</button>
        </form>
      </div>
    </section>
  );
}
