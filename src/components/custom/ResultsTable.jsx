"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { convertToDigit } from "@/lib/convertToDigit";
import { transformAcademicSession } from "@/lib/convertAcademicSession";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

function promotionStatus(courses) {
  let below50Count = 0;

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];

    if (course.courseScore < 50) {
      below50Count++;
    }
  }
  if (below50Count === 0) {
    return "pass";
  } else if (below50Count === 1) {
    return "resit";
  } else if (below50Count === 2) {
    return "repeat";
  } else {
    return "withdraw";
  }
}

const ResultsTable = () => {
  const { selectedStudentData: data } = useSelector((st) => st.app);
  const classes = Object.keys(data.details[0]);

  return (
    <Card className="mb-5">
      <CardContent className="pt-8">
        {classes.slice(0, -2).map((level, index) => {
          
          const levelArr = data.details[0][level];
          const variantName = promotionStatus(levelArr);
          return (
            <div key={index} className=" flex flex-col gap-5 mb-10">
              <div className="border-primaryGray border rounded ">
                <div className="h-[40px] w-full grid items-center px-2">
                  <div className="border-r font-bold border-primaryGray grid items-center h-full w-[fit-content] ">
                    <span className="mr-5">
                      {" "}
                      {`${convertToDigit(level)}L ${transformAcademicSession(data?.academicSessionAdmitted ?? '2019/2020')} Session`}
                    </span>
                  </div>
                </div>

                <TableSection level={levelArr} />
              </div>

              {/* // TODO: Fix button style */}

              <Button className="self-end  " variant={variantName}>
                {variantName}
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

const TableSection = ({ level }) => {
  return (
    <Table>
      <TableHeader className="border-primaryGray">
        <TableRow className=" bg-placeholder text-black" isHeaderRow={true}>
          {level?.courses?.map((course, index) => (
            <TableHead
              key={index}
              className="capitalize text-black font-bold text-center"
            >
              {course?.courseTitle}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="border-primaryGray">
        <TableRow key={1}>
          {level?.courses?.map((course, index) => (
            <TableCell
              key={index}
              className="border-r border-primaryGray text-black font-bold text-center"
            >
              {course?.courseScore}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ResultsTable;
