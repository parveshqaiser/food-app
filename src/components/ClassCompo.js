
import React from "react";
import userDetails from "../utils/userDetails";

class TestComponent extends React.Component {
    constructor(){
        super();
        this.state ={
            count : 1,
        };      
        console.log("parent constructor called")
    }

    componentDidMount()
    {
        this.setState({
            count :  3,
        })
        console.log("parent did mount called")
    }

    componentDidUpdate()
    {
        console.log("parent did update called")
    }

    componentWillUnmount()
    {
        console.log("parent component destroyed ");
    }

    render(){
        console.log("parent render called");
        // debugger
        return(
            <div className="">
                {this.state.count}
                <userDetails.Consumer>
                    {({name})=> <h2>{name}</h2>}
                </userDetails.Consumer>
            </div>
        )
    }
};

export default TestComponent;