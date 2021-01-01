export default function selectAthlete(component, firstName, lastName, weight, grade, id) {
    component.setState({selectedAthleteFirstName : firstName}) 
    component.setState({selectedAthleteLastName : lastName}) 
    component.setState({selectedAthleteWeight : weight}) 
    component.setState({selectedAthleteGrade : grade}) 
    component.setState({selectedAthleteID : id})
}