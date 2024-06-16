import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../common/store/store";
// import { Form } from "react-bootstrap";

/**
 * Consists of a form to insert a cover into the database.
 * @returns
 */
const CreateCover = () => {
  const CREATE_COVER_ENDPOINT = "http://localhost:8000/create-cover";
  const CREATE_PAGE_ENDPOINT = "http://localhost:8000/create-page-for/0";
  const ACTIVE_USER = useSelector((state: RootState) => state.user.user?.username);

  const navigate = useNavigate();
  if (!ACTIVE_USER) {
    navigate("/login");
  }

  // const FIRST_PAGE = 100;

  // let sample_insert = {
  //   title: "7th Day",
  //   author: "Necrotroph",
  //   genre: "Adventure",
  //   summary: "This is the 7th sample book im entering.",
  //   first_page: 23,
  // };

  const postPage = async (e) => {
    console.log("creating page");
    var page_data = {
      prompt: 0,
      body_text: e.target.elements.body.value,
      page_num: 1,
      author: ACTIVE_USER,
    };

    let resp = await fetch(CREATE_PAGE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify(sample_insert),
      body: JSON.stringify(page_data),
    });
    let data = await resp.json();
    console.log("resp data after page insert", data);
    // if (res.status !== 200) {
    //   console.log("status code not 200");
    //   throw new Error(res.statusText);
    // }
    console.log("createPage success");
    console.log("returning", data);
    return data;
  };

  const postCover = async (e, first_page) => {
    console.log("posting cover");
    var form_data = {
      title: e.target.elements.title.value,
      author: ACTIVE_USER,
      genre: e.target.elements.genre.value,
      summary: e.target.elements.summary.value,
      first_page: first_page,
    };

    // console.log("1");
    // console.log("json obj", JSON.stringify(form_data));
    // console.log("e.target.action", e.target.action);

    fetch(e.target.action, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify(sample_insert),
      body: JSON.stringify(form_data),
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log("status code not 200");
          throw new Error(response.statusText);
        }
        console.log("createCover success");
        // return response.json();
        navigate(`/browse`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validate form and format for sending
    //get data
    let page_data = await postPage(e);
    await postCover(e, page_data.data[0].id);
  };

  return (
    <>
      <div className='bg-light pt-4'>
        <div className='row justify-content-center'>
          <div className='col-6 w-auto h1 border border-dark rounded p-2'>Create Cover</div>
        </div>
        <form
          className='px-4'
          action={CREATE_COVER_ENDPOINT}
          method='POST'
          onSubmit={handleSubmit}>
          <div className='form-group row mt-4 p-4 border border-dark rounded'>
            <label
              htmlFor='inputTitle'
              className='col-sm-2 col-form-label'>
              Title
            </label>
            <div className='col-sm-10'>
              <input
                type='text'
                className='form-control'
                id='inputTitle'
                placeholder='Title'
                name='title'
                required
              />
            </div>

            <label
              htmlFor='inputGenre'
              className='col-sm-2 col-form-label'>
              Genre
            </label>
            <div className='col-sm-10'>
              <input
                type='text'
                className='form-control'
                id='inputGenre'
                placeholder='Genre'
                name='genre'
                required
              />
            </div>

            <div className='row'>
              <label
                htmlFor='textAreaSummary'
                className='col mt-2'>
                Summary
              </label>
              <div className='col-10'>
                <textarea
                  className='form-control my-2'
                  id='textAreaSummary'
                  rows='3'
                  name='summary'></textarea>
              </div>
            </div>
          </div>
          {/** first page has no prompt and no parent */}

          <div className='form-group row mt-4 p-4 border border-dark rounded'>
            <label htmlFor='textAreaBody'>Body of first page</label>
            <textarea
              className='form-control my-2'
              id='textAreaBody'
              rows='3'
              name='body'
              required></textarea>
          </div>

          <div className='form-group row justify-content-end mt-4'>
            <div className='col-6 w-auto'>
              <button
                type='submit'
                className='btn btn-primary'
                formAction={CREATE_COVER_ENDPOINT}>
                Publish!
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCover;
