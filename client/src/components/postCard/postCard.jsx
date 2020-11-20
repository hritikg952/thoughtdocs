import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import "./postCard.css";

import {
  Switch,
  FormGroup,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import { updatePublishStatusInPost, deletePost } from "../../helpers/index";
import DeleteModal from "../DeleteModal/DeleteModal";
function PostCard({
  author,
  profileImage,
  title,
  date,
  id,
  author_id,
  commentCount,
  isSwitch = false,
  isDelete = false,
  published,
}) {
  //!modal function
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  //!delete function

  const handleDeletePost = () => {
    deletePost(author_id, id).then((data) => {
      console.log(data);
      setOpenDeleteModal(false);
      window.location.reload(false);
    });
  };

  //!main function
  const postcard = () => {
    const [isPublished, setIsPublished] = useState(published);

    const handlePublishedChange = (event) => {
      setIsPublished(event.target.checked);
      updatePublishStatusInPost(
        { published: event.target.checked },
        author_id,
        id
      ).then((data) => {
        console.log(data);
      });
    };
    return (
      <div className="postcard-container">
        <div className="postcard-header">
          <div className="postcard-header-sub">
            <div className="profile">
              {profileImage !== null && (
                <img src={profileImage} className="profileImage" />
              )}
            </div>
            <div>
              <h3>{author}</h3>
              <p style={{ color: "grey" }}>{date}</p>
            </div>
          </div>
          {isSwitch && (
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="publish"
                control={
                  <Switch
                    checked={isPublished}
                    onChange={handlePublishedChange}
                    name="publish"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                }
                label="Publish"
                labelPlacement="start"
              />
            </FormGroup>
          )}
        </div>
        <div className="postcard-story">
          <Link
            to={{
              pathname: `/post/${id}`,
              state: { id: id, author_id: author_id },
            }}
          >
            {title}
          </Link>
          <div className="postcard-reacts">
            <div style={{ display: "flex" }}>
              <button>
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: "rgb(54, 54, 54)" }}
                />
                <span>Likes</span>
              </button>
              <button>
                {commentCount}
                <FontAwesomeIcon
                  icon={faComment}
                  style={{ color: "rgb(54, 54, 54)" }}
                />
                <span>Comments</span>
              </button>
            </div>
            {isDelete && (
              <IconButton
                color="primary"
                aria-label="delete"
                onClick={handleOpenDeleteModal}
              >
                <DeleteOutlineIcon fontSize="large" />
              </IconButton>
            )}
          </div>
          <DeleteModal
            openModal={openDeleteModal}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDeletePost}
          />
        </div>
      </div>
    );
  };

  return <>{postcard()}</>;
}

export default PostCard;
