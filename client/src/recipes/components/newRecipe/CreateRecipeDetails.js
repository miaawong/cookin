import React, { useRef, useState, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setDraftRecipe, uploadImage } from "../../recipeAction";
import { Line } from "rc-progress";
import {
    StyledForm,
    Submit,
    TextInput,
    TextArea,
    HourMinute,
    ImageUpload,
    ProgressLabel,
    ErrorMessage,
} from "../StyledForm";
import { useDropzone } from "react-dropzone";
import blankImage from "../../../images/blankimage.jpg";

const CreateRecipeDetails = ({ JWToken }) => {
    const { register, handleSubmit, errors } = useForm();
    const [file, setFile] = useState({});
    const [dropped, setDropped] = useState(false);
    const onDrop = useCallback((acceptedFiles, e) => {
        setFile(acceptedFiles);
        setDropped(true);
    }, []);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    const filepath = acceptedFiles.map((file) => {
        Object.assign(file, {
            preview: URL.createObjectURL(file),
        });

        return (
            <li key={file.path} style={{ listStyle: "none" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        textAlign: "center",
                        paddingBottom: "1rem",
                    }}
                >
                    <img
                        src={file.preview}
                        style={{
                            width: "75px",
                            height: "75px",
                            objectFit: "contain",
                        }}
                        alt={file.name}
                    />
                    <p>
                        {file.path.length > 15
                            ? `${file.path.substr(0, 15)}`
                            : file.path}
                    </p>
                </div>
            </li>
        );
    });

    const recipeNameRef = useRef();
    const recipeDescRef = useRef();
    const servingsRef = useRef();
    const hourRef = useRef();
    const minutesRef = useRef();

    const dispatch = useDispatch();
    const [uploadProgress, setProgress] = useState(0);
    const config = {
        headers: {
            Authorization: `Bearer ${JWToken}`,
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
            console.log(progressEvent);
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            setProgress(percent);
        },
    };
    const onSubmit = (data) => {
        if (!dropped) {
            const updatedData = { ...data, img: blankImage };
            dispatch(setDraftRecipe(updatedData));
        } else {
            dispatch(uploadImage(file, JWToken, config))
                .then((url) => {
                    const updatedData = { ...data, img: url };
                    dispatch(setDraftRecipe(updatedData));
                })
                .catch((err) => {
                    return err;
                });
        }
    };

    console.log(errors, "err");
    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <ProgressLabel>Details</ProgressLabel>
            <label>
                Name
                <TextInput
                    type="text"
                    name="recipeName"
                    placeholder="Recipe Name"
                    ref={(e) => {
                        register(e, {
                            required: "*Name is required",
                            maxLength: 23,
                        });
                        recipeNameRef.current = e;
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            recipeDescRef.current.focus();
                        }
                    }}
                />
            </label>
            {errors["recipeName"] && (
                <ErrorMessage>{errors["recipeName"].message}</ErrorMessage>
            )}
            {errors.recipeName?.type === "maxLength" && (
                <ErrorMessage>Your input exceed max length</ErrorMessage>
            )}
            <label>
                Description
                <TextArea
                    type="text"
                    name="recipeDesc"
                    placeholder="Description"
                    ref={(e) => {
                        register(e);
                        recipeDescRef.current = e;
                    }}
                    style={{ height: "8rem" }}
                    // cannot keypress cause it's textarea
                />
            </label>
            <label>
                Servings
                <TextInput
                    type="text"
                    name="servings"
                    placeholder="Servings"
                    ref={(e) => {
                        register(e, {
                            pattern: {
                                value: /^[0-9]*$/,
                                message: "*Must be a number",
                            },
                        });
                        servingsRef.current = e;
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            hourRef.current.focus();
                        }
                    }}
                />
            </label>

            {errors["servings"] && (
                <ErrorMessage>{errors["servings"].message}</ErrorMessage>
            )}
            <HourMinute>
                <label>
                    Hour
                    <TextInput
                        type="number"
                        name="duration_hour"
                        placeholder="Hour"
                        ref={(e) => {
                            register(e);
                            hourRef.current = e;
                        }}
                        style={{ width: "90%" }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                minutesRef.current.focus();
                            }
                        }}
                    />
                </label>

                <label>
                    Minutes
                    <TextInput
                        type="number"
                        name="duration_mins"
                        placeholder="Mins"
                        ref={(e) => {
                            register(e);
                            minutesRef.current = e;
                        }}
                        style={{ width: "90%" }}
                    />
                </label>
            </HourMinute>
            <div>
                <ImageUpload {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drop or click to upload image</p>
                    <div>{filepath}</div>
                    {uploadProgress > 0 && (
                        <Line
                            percent={uploadProgress}
                            strokeWidth="2"
                            strokeColor="#ffda0b"
                            style={{
                                position: "absolute",
                                bottom: "0",
                                borderRadius: "8px",
                                width: "100%",
                            }}
                        />
                    )}
                </ImageUpload>
            </div>

            <div>
                <Submit type="submit" value="Submit" name="Submit">
                    {" "}
                    Submit
                </Submit>
            </div>
            <div style={{ marginBottom: "5rem" }} />
        </StyledForm>
    );
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
});
export default connect(mapStateToProps)(CreateRecipeDetails);
