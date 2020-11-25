import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import ReactToPrint from 'react-to-print';
import { highSchoolWeights } from '../WeightClass';

// Does not currently re-render on editing an athlete

class ComponentToPrint extends React.Component {
    state = {
        fourthStringAthletes: []
    }

    componentDidMount(){
        this.getfourthStringAthletes()
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

    getfourthStringAthletes= () => {
        Axios.get(`/api/lists/${this.props.list_id}/athletes`)
        .then(res => {
            const athletes = res.data.filter(ath => ath.rank === 4)
            let completedRoster = [];
            let currentAthlete = null;
            highSchoolWeights.forEach(weight => {
                athletes.forEach(athlete => {
                    if(athlete.weight == weight) currentAthlete = athlete;
                }) 
                if (currentAthlete !== null) {
                    completedRoster.push(currentAthlete)
                } else {
                    completedRoster.push({first_name:'',last_name:'', weight: weight, grade: '', rank: 4})
                }
                currentAthlete = null;
            })
            var sorted = completedRoster.sort(this.compare)
            this.setState({
            fourthStringAthletes: sorted
            })
        })
        .catch(err => this.props.setMessage(err.message))
    }

    renderfourthStringAthletes = () => {
        return this.state.fourthStringAthletes !== 0 ? this.state.fourthStringAthletes.map(a => (           
            <tr>
                <td id="individual">{a.first_name} {a.last_name} {a.weight} {a.grade}</td>
            </tr>)) : "No Athletes"
    }

    isEmpty = () => {
        if (this.state.fourthStringAthlete !== 0) return true
        return false
    }

    sortAthletes = (athletes) => {
        var arr = [...athletes]
        var i = 0
        while (i < arr.length - 1) {
            if (parseInt(arr[i].weight) > parseInt(arr[i+1].weight)){
              var holder = arr[i]
              arr[i] = arr[i+1]
              arr[i+1] = holder
              i = i+1
            }else{
                i = i+1
            }
        }
        return arr
    }

    render() {
        const {fourthStringAthletes} = this.state
        return this.isEmpty() ? (<table id="varsity">
        <th colSpan="3">4th String</th>
        <tbody>
            {this.renderfourthStringAthletes()}
        </tbody>
    </table>) : <p>no athletes</p>}
      ;
  }

export default function PrintableVarsity(props){
    const componentRef = useRef();
    return (
        <div>
            <ComponentToPrint ref={componentRef} {...props} />
            <ReactToPrint
            trigger={() => <button>Print 4th String Roster!</button>}
            content={() => componentRef.current}
            />
      </div>
    );
  };