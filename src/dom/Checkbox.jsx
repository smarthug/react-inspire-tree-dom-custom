import React from "react";
import CheckboxM from '@material-ui/core/Checkbox'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityBorder from '@material-ui/icons/VisibilityOffOutlined';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click(event) {
        // Define our default handler
        const handler = () => {
            this.props.node.toggleCheck();
        };

        event.persist();
        // Emit an event with our forwarded MouseEvent, node, and default handler
        this.props.dom._tree.emit(
            "node.click",
            event,
            this.props.node,
            handler
        );

        // Unless default is prevented, auto call our default handler
        if (!event.treeDefaultPrevented) {
            handler();
        }
    }

    componentDidMount() {
        this.el.indeterminate = this.props.indeterminate;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.indeterminate !== this.props.indeterminate) {
            this.el.indeterminate = this.props.indeterminate;
        }
    }

    render() {
        const { node } = this.props;
        if(!node.layer){
            node.layer = 0
        }
        return (
           
            <React.Fragment>
                <CheckboxM

                    style={{
                        // marginLeft: "20px",
                        padding: "0px",
                        position: "absolute",
                        right: "25px"
                    }}

                    icon={<Visibility />}
                    checkedIcon={<VisibilityBorder />}
                    name="checkedI"
                    ref={el => {
                        this.el = el;
                    }}

                    checked={node.checked()}
                    onClick={this.click}
                />

                   <span style={{
                        // marginLeft: "20px",
                        padding: "3px",
                        position: "absolute",
                        right: "5px"
                   }}>{node.layer}</span>
           </React.Fragment>

        );
    }
}

export default Checkbox;

// () => {myFunc(); return node.checked()}


{/* <input
                ref={el => {
                    this.el = el;
                }}
                type="checkbox"
                checked={node.checked()}
                onClick={this.click}
            /> */}