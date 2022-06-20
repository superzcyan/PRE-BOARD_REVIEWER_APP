import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { useRecoilState, useRecoilValue } from "recoil";
import { allQuestions, completedExam } from "./atoms";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import Card from "../components/Card";

ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryExam = () => {
  const allQuestionSet = useRecoilValue(allQuestions);
  const [completedQuestions] = useRecoilState(completedExam);
  const [expandedRows, setExpandedRows] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  //SETTING DATAS
  const easyQ = completedQuestions.filter(
    (question) => question.category === "easy"
  );
  const modQ = completedQuestions.filter(
    (question) => question.category === "moderate"
  );
  const hardQ = completedQuestions.filter(
    (question) => question.category === "hard"
  );

  const allTime = completedQuestions.map((x) => x.timeTaken);

  useEffect(() => {
    //getting the sum of time taken
    setTotalTime(
      parseFloat(
        allTime
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          )
          .toFixed(2)
      )
    );
  }, [allTime]);

  const hrsTaken = totalTime >= 3600 && Math.floor(totalTime / 3600);
  const minsTaken = totalTime > 59 && Math.floor((totalTime % 3600) / 60);
  const secsTaken =
    totalTime > 59 ? Math.floor((totalTime % 3600) % 60) : totalTime;

  const getSumArray = (array) => {
    return parseFloat(
      array.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      )
    );
  };
  const easyTime = easyQ.map((x) => x.timeTaken);
  const avgEasyTime =
    easyTime.length > 0 ? getSumArray(easyTime) / easyTime.length : 0;
  const shortestEasyTime = easyTime.length > 0 ? Math.min(...easyTime) : 0;
  const longestEasyTime = easyTime.length > 0 ? Math.max(...easyTime) : 0;
  const modTime = modQ.map((x) => x.timeTaken);
  const avgModTime =
    modTime.length > 0 ? getSumArray(modTime) / modTime.length : 0;
  const shortestModTime = modTime.length > 0 ? Math.min(...modTime) : 0;
  const longestModTime = modTime.length > 0 ? Math.max(...modTime) : 0;
  const hardTime = hardQ.map((x) => x.timeTaken);
  const avgHardTime =
    hardTime.length > 0 ? getSumArray(hardTime) / hardTime.length : 0;
  const avgMinsHardTime = avgHardTime > 0 ? Math.floor(avgHardTime / 60) : 0;
  const avgSecsHardTime =
    avgMinsHardTime > 0 ? Math.floor(avgHardTime % 60) : 0;
  const shortestHardTime = hardTime.length > 0 ? Math.min(...hardTime) : 0;
  const longestHardTime = hardTime.length > 0 ? Math.max(...hardTime) : 0;
  //

  const completedPercent = parseFloat(
    ((completedQuestions.length / allQuestionSet.length) * 100).toFixed(1)
  );
  const remainingQuestions = completedQuestions.length - allQuestionSet.length;
  const [doughChartData] = useState({
    datasets: [
      {
        data: [completedQuestions.length, remainingQuestions],
        cutout: "90%",
        backgroundColor: ["#fbbe24", "#f7f9fb"],
        hoverBackgroundColor: ["#fbbe24", "#f7f9fb"],
        borderColor: "#f7f9fb",
        borderRadius: 40,
        radius: "90%",
        borderAlign: "inner",
      },
    ],
  });
  //doughChartData plugin -- percentage inside doughnut chart
  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 80).toFixed(2);
        ctx.font = fontSize + "em Poppins";
        ctx.textBaseline = "middle";
        var text = completedPercent ? completedPercent + "%" : 0 + "%",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  const [pieChartData] = useState({
    labels: ["Easy", "Moderate", "Hard"],
    datasets: [
      {
        data: [easyQ.length, modQ.length, hardQ.length],
        backgroundColor: ["#fbbe24", "#003006", "#77060c"],
        hoverBackgroundColor: ["#fbbe24", "#003006", "#77060c"],
      },
    ],
  });

  //states for pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );

  //TABLE COMPONENTS
  const onCustomPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(event.page + 1);
  };
  const paginatorTemplate = {
    layout:
      "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3 text-xs">Previous</span>
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3 text-xs">Next</span>
        </button>
      );
    },
    PageLinks: (options) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { "p-disabled": true });

        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
        </button>
      );
    },
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: "All", value: options.totalRecords },
      ];

      return (
        <Dropdown
          className="text-xs"
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span
          className="mx-3 text-xs space-x-1"
          style={{ color: "var(--text-color)", userSelect: "none" }}
        >
          <span> Go to</span>
          <InputText
            className="text-xs w-10"
            value={currentPage}
            tooltip={pageInputTooltip}
            onKeyDown={(e) => onPageInputKeyDown(e, options)}
            onChange={onPageInputChange}
          />
        </span>
      );
    },
  };
  const onPageInputKeyDown = (event, options) => {
    if (event.key === "Enter") {
      const page = parseInt(currentPage);
      if (page < 1 || page > options.totalPages) {
        setPageInputTooltip(
          `Value must be between 1 and ${options.totalPages}.`
        );
      } else {
        const first = currentPage ? options.rows * (page - 1) : 0;

        setFirst(first);
        setPageInputTooltip("Press 'Enter' key to go to this page.");
      }
    }
  };
  const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
  };
  const isCorrectBodyTemplate = (rowData) => {
    return (
      <span
        className={`${
          rowData.isCorrect
            ? "text-gray-900 font-medium bg-amber-400 rounded-sm p-1 px-3"
            : "p-1 px-3"
        }`}
      >
        {rowData.isCorrect ? "True" : "False"}
      </span>
    );
  };
  const attemptsBodyTemplate = (rowData) => {
    return <span className="">{rowData.timeTaken} secs</span>;
  };
  const tableTitle = (
    <div className="text-lg text-darkgreen">Completed Questions</div>
  );

  //component for expanded rows
  const rowExpansionTemplate = (data) => {
    return (
      <DataTable className="md:mx-20" value={data.choices}>
        <Column
          field="choice"
          header="Choices"
          style={{ width: "40%" }}
        ></Column>
        <Column
          field="description"
          header="Description"
          style={{ width: "40%" }}
        ></Column>
        <Column
          field="isCorrect"
          header="Correct Answer"
          body={isCorrectBodyTemplate}
        ></Column>
      </DataTable>
    );
  };
  return (
    <div className="pt-5 sm:px-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col justify-center items-center block p-4 max-w-sm">
          <h5 className="text-gray-700 text-md leading-tight font-medium mb-2">
            Total Exam Time
          </h5>
          <div className="flex justify-items-center items-start text-gray-900 text-7xl font-bold mb-4 space-x-2 divide-x-2">
            {hrsTaken && (
              <div className="flex flex-col items-center">
                {hrsTaken} <span className="text-sm font-normal"> hrs</span>
              </div>
            )}
            {minsTaken && (
              <div className="flex flex-col items-center pl-4">
                {minsTaken} <span className="text-sm font-normal"> mins</span>
              </div>
            )}
            <div className="flex flex-col items-center  pl-4">
              {secsTaken} <span className="text-sm font-normal"> secs</span>
            </div>
          </div>
        </div>
        <Card
          title="Easy Avg Time"
          body={avgEasyTime}
          shortest={shortestEasyTime}
          longest={longestEasyTime}
        />
        <Card
          title="Moderate Avg Time"
          body={avgModTime}
          shortest={shortestModTime}
          longest={longestModTime}
        />
        <Card
          title="Hard Avg Time"
          body={{
            avgMinsHardTime: avgMinsHardTime,
            avgSecsHardTime: avgSecsHardTime,
          }}
          shortest={shortestHardTime}
          longest={longestHardTime}
        />
      </div>
      <hr className="py-4 border-gray-300" />
      <div className="grid sm:grid-cols-2	gap-2 py-4">
        <div className="flex flex-col items-center">
          <label className="text-darkgreen text-lg font-medium">
            Completed Overall Questions
          </label>
          <div className="card">
            <Doughnut className="" data={doughChartData} plugins={plugins} />
          </div>
        </div>

        <div className="card flex flex-col items-center">
          <label className="text-darkgreen text-lg font-medium">
            Counts Per Category
          </label>
          <div className="card">
            <Pie className="" data={pieChartData} />
          </div>
        </div>
      </div>
      <div className="text-xs drop-shadow-lg">
        <DataTable
          value={completedQuestions}
          responsiveLayout="stack"
          breakpoint="960px"
          header={tableTitle}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          size="small"
          paginator
          paginatorTemplate={paginatorTemplate}
          first={first}
          rows={rows}
          onPage={onCustomPage}
        >
          <Column expander style={{ width: "2%" }} />
          <Column field="question" header="Question" style={{ width: "70%" }} />
          <Column
            field="category"
            header="Category"
            style={{ textTransform: "capitalize" }}
          />
          <Column
            field="timeTaken"
            body={attemptsBodyTemplate}
            header="Time Taken"
            style={{}}
          />
          <Column field="attempts" header="Attempts" style={{}} />
        </DataTable>
      </div>
    </div>
  );
};

export default SummaryExam;
