import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const CreatePage = () => {
  const { parent_id } = useParams();

  const [cover, setCover] = useState();
  const CREATE_PAGE_ENDPOINT = `http://localhost:8000/create-page-for/${parent_id}`;
  const CURRENT_COVER_ENDPOINT = `http://localhost:8000/cover-by/${parent_id}`;
  const ACTIVE_USER = "Brian";
  // const parent_pg_num = 45

  useEffect(() => {
    const fetchCover = async () => {
      const result = await fetch(CURRENT_COVER_ENDPOINT);
      const data = await result.json();
      console.log("fetch cover data", data.data[0]);
      // setPage(data.data[0]);
      setCover(() => data.data[0]);
      //untick checkbox
      console.log("pg num", data.data[0].hlevel);
      console.log("parent id type", typeof parent_id);
    };
    fetchCover();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //validate form and format for sending
    //get data

    var form_data = {
      prompt: e.target.elements.prompt.value,
      body_text: e.target.elements.body_text.value,
      // page_num: cover.hlevel + 1,
      page_num: cover.hlevel + 1,
      author: ACTIVE_USER,
    };

    console.log("prompt", typeof e.target.elements.prompt.value);
    console.log("body_text", typeof e.target.elements.body_text.value);

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
        console.log("success");
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="bg-light pt-4">
        <div className="row justify-content-center">
          <div className="col-6 w-auto h1 border border-dark rounded p-2">
            Create Page
          </div>
        </div>
        <form
          className="px-4"
          action={CREATE_PAGE_ENDPOINT}
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="form-group row mt-4 p-4 border border-dark rounded">
            <label htmlFor="inputParentId" className="col-sm-2 col-form-label">
              For page..
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputparentId"
                placeholder={parent_id}
                name="parent_id"
                disabled
              />
            </div>

            <label htmlFor="textAreaPrompt" className="col mt-2">
              Prompt
            </label>
            <div className="col-10">
              <textarea
                type="text"
                className="form-control my-2"
                id="textAreaPrompt"
                rows="3"
                name="prompt"
                required
              />
            </div>

            <div className="row">
              <label htmlFor="textAreaBody" className="col mt-2">
                Body
              </label>
              <div className="col-10">
                <textarea
                  type="text"
                  className="form-control my-2"
                  id="textAreaBody"
                  rows="3"
                  name="body_text"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div className="form-group row justify-content-end mt-4">
            <div className="col-6 w-auto">
              <button
                type="submit"
                className="btn btn-primary"
                formAction={CREATE_PAGE_ENDPOINT}
              >
                Publish!
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePage;
