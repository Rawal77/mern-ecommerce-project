import { Table } from "react-bootstrap";

export const DataTable = ({ data = [] }) => {
  console.log(data);
  return data.length ? (
    <Table striped hover size="sm">
      <thead className="table-dark">
        <tr>
          {Object.keys(data[0]).map((k, i) => (
            <th key={i}>{k}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            {Object.values(item).map((v, j) => (
              <td key={j}>{v}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <h4 className="fst-italic text-muted">No Data Found</h4>
  );
};
