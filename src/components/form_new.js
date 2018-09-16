import React, { Component } from "react";
import { Field, reduxForm, formValueSelector, FieldArray } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions/index";
import SelectInput from "./react_select";
import FileInput from "./file_input";
import Zoom from "@material-ui/core/Zoom";

import Dropzone from "react-dropzone";

class FormNew extends Component {
  constructor(props) {
    super(props);
  }
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ""} </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
    console.log(values);
  }

  render() {
    const { handleSubmit, hasEmailValue } = this.props;
    const options = [
      { label: "India", value: "IND" },
      { label: "China", value: "CHI" },
      { label: "United Kingdom", value: "UK" },
      { label: "Germany", value: "DE" },
      { label: "Russian Federation", value: "RU" },
      { label: "United States", value: "US" }
    ];
    const skills = [
      { label: "React", value: "R" },
      { label: "Redux", value: "RD" },
      { label: "Node-Js", value: "ND" },
      { label: "React-Native", value: "RN" },
      { label: "CSS", value: "CS" },
      { label: "MongoDB", value: "MDB" },
      { label: "Mongoose", value: "MGO" },
      { label: "HTML", value: "HL" },
      { label: "Express-Js", value: "EXP" }
    ];

    return (
      <Zoom in={true} style={{ transitionDelay: true ? 400 : 0 }}>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="title-head">
            <h2> Vetted Application Form </h2>
          </div>
          <Field name="fname" component={this.renderField} label="First Name" />
          <Field name="lname" component={this.renderField} label="Last Name" />
          <Field name="email" component={this.renderField} label="Email" />

          <div>
            <label htmlFor="hasEmail">Has Experience?</label>
            <div>
              <Field
                name="hasEmail"
                id="hasEmail"
                component="input"
                type="checkbox"
              />
            </div>
          </div>
          {hasEmailValue && (
            <div>
              <label>Years of Experience</label>
              <div>
                <Field
                  name="number"
                  component="input"
                  type="number"
                  placeholder="Year of Exp you have?"
                />
              </div>
            </div>
          )}
          <div>
            <label className="sexLabel">Tech Skills</label>
          </div>
          <Field
            name="skills"
            options={skills}
            component={SelectInput}
            isMulti
          />

          <div className="sexLabel">
            <label>Sex</label>
            <div>
              <label className="RdioBtn">
                <Field name="sex" component="input" type="radio" value="male" />
                Male
              </label>

              <label>
                <Field
                  name="sex"
                  component="input"
                  type="radio"
                  value="female"
                />
                Female
              </label>
            </div>
          </div>
          <div>
            <label> Country</label>
          </div>
          <Field name="country" options={options} component={SelectInput} />

          <Field
            name="content"
            component={this.renderField}
            label="About you:"
          />

          <div className="sexLabel">
            <label> Click below to upload your cv</label>
          </div>
          <Field
            name={"files"}
            component={FileInput}
            multiple={false}
            dropzoneOnDrop={this.handleDrop}
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/" className="btn btn-danger">
            Cancel
          </Link>
        </form>
      </Zoom>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.fname) {
    errors.fname = "Required";
  } else if (values.fname.length > 15) {
    errors.fname = "Must be 15 characters or less";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.lname) {
    errors.lname = "Required";
  }
  if (!values.content) {
    errors.content = "Enter some content";
  }
  return errors;
}

const selector = formValueSelector("PostsNewForm");
FormNew = connect(state => {
  const hasEmailValue = selector(state, "hasEmail");
  return { hasEmailValue };
})(FormNew);

export default reduxForm({
  validate,
  form: "PostsNewForm"
})(
  connect(
    null,
    { createPost }
  )(FormNew)
);
