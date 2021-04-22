import { sendMessageCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {sendMessage: sendMessageCreator}),
    withAuthRedirect
)(Dialogs);