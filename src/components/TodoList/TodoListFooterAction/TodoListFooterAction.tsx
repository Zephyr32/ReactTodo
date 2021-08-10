import React, { FC } from "react";
import "./TodoListFooterAction.scss";
import Button from "@material-ui/core/Button";
import { FilterType } from "../../../models/todo.model";
import { useStyles } from "../todoList.styles";

export const TodoListFooterAction: FC<{
  deleteTasks: (filter: FilterType) => void;
}> = ({ deleteTasks }) => {
  const s = useStyles();

  return (
    <div className={s.footerListAction}>
      <Button
        children={"Delete all tasks"}
        variant="contained"
        color="secondary"
        onClick={() => deleteTasks(FilterType.ALL)}
      />
      <Button
        children={"Delete done tasks"}
        variant="contained"
        color="secondary"
        onClick={() => deleteTasks(FilterType.DONE)}
      />
    </div>
  );
};
