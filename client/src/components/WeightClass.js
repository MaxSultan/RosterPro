import React from "react";

export const highSchoolWeights = [
  106,
  113,
  120,
  126,
  132,
  138,
  145,
  152,
  160,
  170,
  182,
  195,
  220,
  285,
];

export default function WeightClass() {
  const renderWeights = (weightsArr) => {
    return weightsArr.map((weight) => (
      <tr>
        <td key={weight}>{weight}</td>
      </tr>
    ));
  };
  return (
    <table id="weights">
      <th>Weight</th>
      {renderWeights(highSchoolWeights)}
    </table>
  );
}
