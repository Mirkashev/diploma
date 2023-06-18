import { Button, Menu } from "semantic-ui-react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

const ExportToExcel = ({ apiData, fileName, statsType }: any) => {
  const dataToJson = (apiData: any) => {
    return apiData.map((el: any) => {
      if (statsType === "exercise") {
        return {
          Группа: el.user.group.title,
          Тема: el.test.topic.title,
          Тест: el.test.title,
          ФИО: `${el.user.surname} ${el.user.firstName} ${el.user.lastName}`,
          Проценты: el.percent,
          "Дата прохождения": el.createdAt,
        };
      }

      return {
        Группа: el.user.group.title,
        Тема: el.test.topic.title,
        Тест: el.test.title,
        ФИО: `${el.user.surname} ${el.user.firstName} ${el.user.lastName}`,
        Проценты: el.percent,
        "Дата прохождения": el.createdAt,
      };
    });
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData: any, fileName: any) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      name="export"
      style={{ cursor: "pointer" }}
      onClick={(e) => exportToCSV(dataToJson(apiData), fileName)}
    >
      Выгрузить таблицу
    </Button>
  );
};

export default ExportToExcel;
