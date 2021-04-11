import React, { ChangeEvent } from 'react'
import s from './ProfileInfo.module.css'

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

export default class ProfileStatus extends React.Component<PropsType, StateType > {
    
    state = {
        editMode: false,
        status: this.props.status
    }
    
    componentDidUpdate(prevProps: PropsType, prevState: StateType){
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    activateEditMode = () =>{
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode =  () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) =>{
        this.setState(
            {
                status:e.currentTarget.value
            }
        );
    }

    render() {
        return (
            <div>
                {
                    this.state.editMode
                        ? <div>
                            <input onChange={this.onStatusChange} autoFocus={true} value={this.state.status}
                                onBlur={this.deactivateEditMode}></input>
                        </div>
                        : <div>
                            <span onDoubleClick={this.activateEditMode}>
                                {this.props.status || "No status"}
                            </span>
                        </div>
                }
            </div>
        )
    }
}
