import { Button } from "react-bootstrap";

export const SubmitBtn = ({ loading = false, icon, label }) => {
  return (
    <Button type="submit" variant="dark" disabled={loading}>
      <i
        className={`fa-solid ${
          loading ? "fa-spinner fa-spin" : "fa-sign-in-alt"
        } me-2`}></i>
      {label}
    </Button>
  );
};
