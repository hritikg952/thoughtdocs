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
import Skeleton from "@material-ui/lab/Skeleton";

import { Link } from "react-router-dom";

import {
  updatePublishStatusInPost,
  deletePost,
  toggleLike,
} from "../../helpers/index";
import DeleteModal from "../DeleteModal/DeleteModal";
function PostCard({
  isLoading,
  author,
  profileImage,
  title,
  date,
  id,
  author_id,
  comments,
  likes,
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

  return <div className="postcard-container">
        <div className="postcard-header">
          <div className="postcard-header-sub">
            <div className="profile">
              {isLoading ? (
                <Skeleton variant="circle" width={40} height={40} />
              ) : (
                profileImage !== null && (
                  <img src={profileImage} className="profileImage" />
                )
              )}
            </div>
            <div>
              {isLoading ? (
                <Skeleton variant="text" width={100} />
              ) : (
                <h3>{author}</h3>
              )}
              {isLoading ? (
                <Skeleton variant="text" width={150} />
              ) : (
                <p style={{ color: "grey" }}>{date}</p>
              )}
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
          {isLoading ? (
            <Skeleton variant="rect" width={800} height={30} />
          ) : (
            <Link
              to={{
                pathname: `/post/${id}`,
                state: { id: id, author_id: author_id },
              }}
            >
              {title}
            </Link>
          )}

          <div className="postcard-reacts">
            <div className="likesANDcomment">
              <div>
                <p className="reacts-icon">
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "#ec5858" }}
                  />
                </p>
                {likes ? <p>{likes}</p> : <p>0</p>}
              </div>
              <div>
                <p className="reacts-icon">
                  <FontAwesomeIcon
                    icon={faComment}
                    style={{ color: "#01c5c4" }}
                  />
                </p>
                {comments ? <p>{comments.length}</p> : <p>0</p>}
              </div>
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
      </div>;
}

export default PostCard;
