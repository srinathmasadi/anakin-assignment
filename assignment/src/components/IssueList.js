import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import './IssueList.css';
import _ from "lodash";

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [paginatedData, setPaginatedData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        "https://api.github.com/repos/octocat/Hello-World/issues?q=state:open"
      )
      .then((response) => {
        if (response.status === 200) {
          setIssues(response.data);
        }
      });
  }, []);

  useEffect(() => {
    if (issues) {
      const paginationData = _(issues).slice(0).take(5).value();
      setPaginatedData(paginationData);
    }
  }, [issues]);

  const pageSize = 5;
  const pageCount = issues ? Math.ceil(issues.length / pageSize) : 0;
  const pages = _.range(1, pageCount + 1);

  const pagination = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * pageSize;
    console.log(page);
    const paginationData = _(issues).slice(startIndex).take(pageSize).value();
    console.log("pagination Data", paginationData);
    setPaginatedData(paginationData);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="header">
          <div className="filter">
            <button>Filter</button>
            <input type="text" placeholder="is:issue is:open"></input>
          </div>
          <div className="labels">
            <div className="label-milestones">
              <button className="labels">
                Labels <span>1</span>{" "}
              </button>
              <button className="milestones">
                Mile-stones <span>0</span>{" "}
              </button>
            </div>
            <button className="new-issues">New issue</button>
          </div>
        </div>
        <div className="table">
          <div className="boxheader">
            <div className="issues">{issues.length} Open-Issues</div>
            <div className="header menu-header">
              <button>
                {" "}
                Author{" "}
                <svg
                  width="6"
                  height="12"
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0.5L5.5 6L0 11.5L0 0.5Z" fill="#444444" />
                </svg>
              </button>
              <button>
                label{" "}
                <svg
                  width="6"
                  height="12"
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0.5L5.5 6L0 11.5L0 0.5Z" fill="#444444" />
                </svg>
              </button>
              <button>
                Projects{" "}
                <svg
                  width="6"
                  height="12"
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0.5L5.5 6L0 11.5L0 0.5Z" fill="#444444" />
                </svg>
              </button>
              <button>
                Milestones{" "}
                <svg
                  width="6"
                  height="12"
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0.5L5.5 6L0 11.5L0 0.5Z" fill="#444444" />
                </svg>
              </button>
              <button>
                Assignee{" "}
                <svg
                  width="6"
                  height="12"
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0.5L5.5 6L0 11.5L0 0.5Z" fill="#444444" />
                </svg>
              </button>
              <button>
                Sort{" "}
                <svg
                  width="6"
                  height="12"
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0.5L5.5 6L0 11.5L0 0.5Z" fill="#444444" />
                </svg>
              </button>
            </div>
          </div>
          <hr />
          <div className="issues-list">
            <table>
              <tbody>
                {paginatedData &&
                  paginatedData.map((value, index) => {
                    return (
                      <tr>
                        <td>{value.title}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <nav className="pag-nav">
          <ul className="pagination">
            <svg
              width="6"
              height="12"
              viewBox="0 0 6 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              opacity={currentPage === 1 ? "0.5" : "1"}
              onClick={() => {
                currentPage - 1 >= 1 && pagination(currentPage - 1);
              }}
            >
              <path d="M6 11.5L0.5 6L6 0.5L6 11.5Z" fill="#ffff" />
            </svg>

            {pages.map((page, index) => (
              <li
                key={index}
                className={
                  page === currentPage
                    ? "page-link pagination-active"
                    : "page-link"
                }
                onClick={() => pagination(page)}
              >
                <p> {page} </p>
              </li>
            ))}
            <svg
              width="6"
              height="12"
              viewBox="0 0 6 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              opacity={currentPage === pageCount ? "0.5" : "1"}
              onClick={() => {
                currentPage + 1 <= pageCount && pagination(currentPage + 1);
              }}
            >
              <path d="M0 0.5L5.5 6L0 11.5L0 0.5Z" fill="#ffff" />
            </svg>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default IssueList;
