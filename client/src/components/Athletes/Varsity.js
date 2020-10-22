import React, { useRef } from 'react'
import Axios from 'axios'
import ReactToPrint from 'react-to-print';

// Does not currently re-render on editing an athlete

class Varsity extends React.Component{
    state = {
        varsityAthletes: []
    }

    componentDidMount(){
        this.getAthletes(this.props.list_id)
    }

    setStateSynchronous(stateUpdate) {
        return new Promise(resolve => {
            this.setState({varsityAthletes: stateUpdate}, ()=> resolve());
            });
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

    async getAthletes(list_id){
        try{
        const res = await Axios.get(`/api/lists/${list_id}/athletes`)
            var athletes = res.data.filter(i => i.rank === 1)
            var sorted = athletes.sort(this.compare)
            await this.setStateSynchronous(sorted)
        } catch (err){
            this.props.setMessage(err.message)
        }
    }

    renderVarsityAthletes = () => {
        const { varsityAthletes } = this.state
        return varsityAthletes !== 0 ? varsityAthletes.map(a => (           
        <tr>
            <td>{a.weight}</td>
            <td>{a.first_name}</td>
            <td>{a.last_name}</td>
        </tr>)) : "No Athletes"
    }
    render(){    
        return (
            <table id="varsity">
                <th colSpan="3">VARSITY</th>
                <tr>
                    <th>Weight Class</th>
                    <th>First Name</th>                    
                    <th>Last Name</th>
                </tr>
                <tbody>
                    {this.state.varsityAthletes.length !== 0 && this.renderVarsityAthletes()}
                </tbody>
            </table>
        )
    }
}

export default function PrintableVarsity(props){
    const componentRef = useRef();
    return (
        <div>
        <Varsity ref={componentRef} {...props} />
        <ReactToPrint
        trigger={() => <button>Print Varsity Roster!</button>}
        content={() => componentRef.current}
        />
      </div>
    );
  };