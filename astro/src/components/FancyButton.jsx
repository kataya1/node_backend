import styles from "./FancyButton.module.css";

const FancyButton = ({ text }) => {
  return (
    <div className={styles.button}>
      <button>{text}</button>

      {/* <style jsx>{`
        .fancy-button {
          background: blue;
          padding: 1rem;
          border-radius: 0.5rem;
        }

        button {
          color: white;
          border: none;
          font-weight: bold;
          font-size: 1.2rem;
        }
      `}</style> */}
    </div>
  );
};

export default FancyButton;
