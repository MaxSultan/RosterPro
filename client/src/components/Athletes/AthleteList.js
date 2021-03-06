import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { highSchoolWeights } from "../WeightClass";
import Athlete from "./Athlete";

class AthleteList extends React.Component {
  state = {
    athletes: [],
  };

  componentDidMount() {
    this.filterAthetes();
  }

  componentDidUpdate(prevProps) {
    if (this.props.allAthletes !== prevProps.allAthletes) {
      this.filterAthetes();
    }
  }

  setStateSynchronous(stateUpdate) {
    return new Promise((resolve) => {
      this.setState({ athletes: stateUpdate }, () => resolve());
    });
  }

  filterAthetes() {
    try {
      var athletes = this.props.allAthletes.filter(
        (i) => i.rank === this.props.rosterRank
      );
      let completedRoster = [];
      let currentAthlete = null;
      highSchoolWeights.forEach((weight) => {
        athletes.forEach((athlete) => {
          if (athlete.weight == weight) currentAthlete = athlete;
        });
        if (currentAthlete !== null) {
          completedRoster.push(currentAthlete);
        } else {
          completedRoster.push({
            id: `${this.props.rosterRank}-${weight}`,
            first_name: "",
            last_name: "",
            weight: weight,
            grade: "",
            rank: this.props.rosterRank,
          });
        }
        currentAthlete = null;
      });
      var sorted = completedRoster.sort(this.compare);
      this.setStateSynchronous(sorted);
    } catch (err) {
      this.props.setMessage(err.message);
    }
  }

  compare(a, b) {
    const athleteA = a.weight;
    const athleteB = b.weight;
    let comparison = 0;
    if (athleteA > athleteB) {
      comparison = 1;
    } else if (athleteA < athleteB) {
      comparison = -1;
    }
    return comparison;
  }

  renderAthletes = () => {
    return this.state.athletes.map((a) => (
      <tr>
        <Athlete
          {...a}
          editAthlete={this.props.editAthlete}
          allAthletes={this.props.allAthletes}
          selectedAthleteId={this.props.selectedAthleteId}
          setSelectedAthleteListId={this.props.setSelectedAthleteListId}
          setSelectedAthleteId={this.props.setSelectedAthleteId}
          setSelectedAthleteFirstName={this.props.setSelectedAthleteFirstName}
          setSelectedAthleteLastName={this.props.setSelectedAthleteLastName}
          setSelectedAthleteGrade={this.props.setSelectedAthleteGrade}
          setSelectedAthleteWeight={this.props.setSelectedAthleteWeight}
          setSelectedAthleteRank={this.props.setSelectedAthleteRank}
          setSelectedAthletePhoneNumber={
            this.props.setSelectedAthletePhoneNumber
          }
          setAddingAthlete={this.props.setAddingAthlete}
          setDeletingAthlete={this.props.setDeletingAthlete}
          setEditingAthlete={this.props.setEditingAthlete}
          setShowTexts={this.props.setShowTexts}
        />
      </tr>
    ));
  };
  render() {
    return this.state.athletes === 0 ? (
      <h1>No Athletes</h1>
    ) : (
      <table className="list" id={this.props.rosterName}>
        <th colSpan="3">{this.props.rosterName}</th>
        <tbody>
          {this.state.athletes.length !== 0 && this.renderAthletes()}
        </tbody>
      </table>
    );
  }
}

export default function PrintableAthleteList(props) {
  const componentRef = useRef();
  return (
    <div>
      <AthleteList ref={componentRef} {...props} />
      <ReactToPrint
        trigger={() => (
          <button className="athletePrintButton">
            Print {props.rosterName} Roster!
          </button>
        )}
        content={() => componentRef.current}
      />
    </div>
  );
}
