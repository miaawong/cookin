import React, { useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setDraftRecipe, uploadImage } from "../../recipeAction";
import { Line } from "rc-progress";
import {
    StyledForm,
    Submit,
    TextInput,
    HourMinute,
    ImageUpload,
    ProgressLabel,
    ErrorMessage,
} from "../StyledForm";
import { useDropzone } from "react-dropzone";

const EditRecipeDetails = ({ recipe, JWToken }) => {
    let { recipeName, recipeDesc, servings, duration, img } = recipe;
    let duration_hour = Math.floor(duration / 60);
    let duration_mins = duration % 60;
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const [file, setFile] = useState(img);
    const [dropped, setDropped] = useState(false);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles);
            setDropped(true);
        },
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
                        padding: "1rem 2rem",
                    }}
                >
                    <img
                        src={file.preview}
                        style={{
                            width: "100px",
                            height: "100px",
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
            const updatedData = { ...data, img: img };
            dispatch(setDraftRecipe(updatedData));
        } else {
            dispatch(uploadImage(file, JWToken, config))
                .then((url) => {
                    const updatedData = { ...data, img: url };
                    dispatch(setDraftRecipe(updatedData));
                })
                .catch((err) => {
                    console.log(err, "no img");
                    return err;
                });
        }
    };
    const recipeNameRef = useRef();
    const recipeDescRef = useRef();
    const servingsRef = useRef();
    const hourRef = useRef();
    const minutesRef = useRef();

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
                            pattern: "I cannot be empty",
                            maxLength: 23,
                        });
                        recipeNameRef.current = e;
                    }}
                    defaultValue={recipeName}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            recipeDescRef.current.focus();
                        }
                    }}
                ></TextInput>
            </label>
            {errors["recipeName"] && (
                <ErrorMessage>{errors["recipeName"].message}</ErrorMessage>
            )}{" "}
            {errors.recipeName?.type === "maxLength" && (
                <ErrorMessage>Your input exceed max length</ErrorMessage>
            )}
            <label>
                Description
                <TextInput
                    type="text"
                    name="recipeDesc"
                    placeholder="Description"
                    ref={(e) => {
                        register(e);
                        recipeDescRef.current = e;
                    }}
                    defaultValue={recipeDesc}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            servingsRef.current.focus();
                        }
                    }}
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
                                value: /^(0|[1-9][0-9]*)$/,
                                message: "*Must Be a Number",
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
                    defaultValue={servings}
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
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                minutesRef.current.focus();
                            }
                        }}
                        defaultValue={isNaN(duration_hour) ? "" : duration_hour}
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
                        defaultValue={isNaN(duration_mins) ? "" : duration_mins}
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
                <Submit type="submit" value="Submit">
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
export default connect(mapStateToProps)(EditRecipeDetails);
