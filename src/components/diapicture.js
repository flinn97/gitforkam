import React, { Component } from 'react';
import Files from "./diapiccontent.js";
import Full from "./fullpic";
import AuthService from "../services/auth.service";

//allows me to create a dialog box to pop up for adding students with names and emails.
class Pic extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.openFull = this.openFull.bind(this);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef;

        this.state = {
            current: AuthService.getCurrentUser(),
            setIsOpen: false,
            src: "//ssl.gstatic.com/accounts/ui/avatar_2x.png",
            previewImage: undefined,
            fullpic: false,
            ad: false,
        }

    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);


        if (this.props.realusr) {
            if (this.props.realusr.profilepic) {
                const porfilePic = this.props.realusr.profilepic;

                //const porfilePic = 'http://localhost8080/api/' + this.props.realusr.profilepic;

                this.setState({ src: porfilePic })

            }
            else {
                this.setState({
                    src: "//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                })
            }
            
        }


    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.handleClose();
        }
    }

    handleChange = (files) => {
        this.setState({
            src: files,

        })
    }
    openFull() {
        this.setState({
            fullpic: true,

        })
    };
    handleClose(){
    this.setState({
        fullpic: false,

    })
}

    render() {
        return (
           
            <div className="popup-box to-front">
                { this.state.fullpic && (<Full handleClose={this.handleClose} img={this.state.src}/>)}
                <div className="diapicbox" ref={this.wrapperRef}>

                    
                        <div>
                    <span className="close-icon-2" onClick={this.props.handleClose}>x</span>
                        <h1>Profile Photo</h1>
                    </div>
                     <div >   
                    <img
                        src={this.state.src}
                        alt="profile-img-card"
                            className=" profile-img-card2 cropped1"
                        
                        />
                    </div>
                    <div>
                        {this.props.realusr ? (<div>
                            {this.state.current.role==="admin" ? (<div><Files handleChange={this.handleChange} usr={this.props.realusr} /></div>) : (<div>{this.props.realusr.role === "student" ? (<div><Files handleChange={this.handleChange} usr={this.props.realusr} /></div>) : (<div><Files handleChange={this.handleChange} /></div>)}
</div>)}
</div>):(<div></div>)}
                    
                    </div>
                    
                </div>
                
            </div>

        )

    }
}

export default Pic;