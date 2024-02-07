import logo from './logo.svg';
import './App.css';


function App() {
  const letters = Array.from({ length: 5 }, (_, index) => String.fromCharCode(65 + index));
  return (
    <div className="table-container">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Place</th>
          <th>Animal</th>
          <th>Thing</th>
        </tr>
      </thead>
      <tbody>
      {letters.map(letter => (
            <tr key={letter}>
              <td>{letter}</td>
              <td contentEditable="true"></td>
              <td contentEditable="true"></td>
              <td contentEditable="true"></td>
              <td contentEditable="true"></td>
            </tr>
          ))}
        {/* Add more rows as needed */}
      </tbody>
    </table>
  </div>
  );
}

export default App;
