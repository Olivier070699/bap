import React, { Component } from 'react'

export class AddDateForm extends Component {
    render() {
        return (
            <div>
                <form>
                    <select id="artist" onChange={this.logChanges} required>
                        <option disabled selected value> -- select an artist -- </option>
                    </select>
                    <select id="client" onChange={this.logChanges} required>
                        <option disabled selected value> -- select a client -- </option>
                    </select>
                    <input id="event" onChange={this.logChanges} type="text" placeholder="event name" required/>
                    <input id="start" onChange={this.logChanges} type="datetime-local" placeholder="start" required/>
                    <input id="stop" onChange={this.logChanges} type="datetime-local" placeholder="stop" required/>
                    <div>
                        <input id="street" onChange={this.logChanges} type="text" placeholder="street" required/>
                        <input id="number" onChange={this.logChanges} type="number" placeholder="number" required/>
                        <input id="city" onChange={this.logChanges} type="text" placeholder="city" required/>
                        <input id="country" onChange={this.logChanges} type="text" placeholder="country" required/>
                    </div>
                    <button>save</button>
                </form>
            </div>
        )
    }
}

export default AddDateForm
