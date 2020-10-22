import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import ReactToPrint from 'react-to-print';

// Does not currently re-render on editing an athlete

class ComponentToPrint extends React.Component {
    state = {
        JVAthletes: []
    }

    componentDidMount(){
        this.getJVAthletes()
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

    getJVAthletes= () => {
        Axios.get(`/api/lists/${this.props.list_id}/athletes`)
        .then(res => {
            const athletes = res.data.filter(ath => ath.rank === 2)
            this.setState({
            JVAthletes: athletes.sort(this.compare)
            })
        })
        .catch(err => this.props.setMessage(err.message))
    }

    renderJVAthletes = () => {
        return this.state.JVAthletes !== 0 ? this.state.JVAthletes.map(a => (           
            <tr>
                <td>{a.weight}</td>
                <td>{a.first_name}</td>
                <td>{a.last_name}</td>
            </tr>)) : "No Athletes"
    }

    isEmpty = () => {
        if (this.state.JVAthlete !== 0) return true
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
        const {JVAthletes} = this.state
        return this.isEmpty() ? (<table id="varsity">
        <th colSpan="3">JUNIOR VARSITY</th>
        <tr>
            <th>Weight Class</th>
            <th>First Name</th>
            <th>Last Name</th>
        </tr>
        <tbody>
            {this.renderJVAthletes()}
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
            trigger={() => <button>Print JV Roster!</button>}
            content={() => componentRef.current}
            />
      </div>
    );
  };