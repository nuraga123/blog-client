import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ userImageUrl, username, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={userImageUrl} alt={username} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{username}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
