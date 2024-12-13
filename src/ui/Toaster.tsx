import { Toaster } from "react-hot-toast";

function HotToaster() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{
        margin: "8px",
      }}
      toastOptions={{
        success: { duration: 3000 },
        error: { duration: 5000 },
        style: {
          fontSize: "14px",
          maxWidth: "500px",
          padding: "8px 10px",
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-700)",
        },
      }}
    />
  );
}

export default HotToaster;
