import { all, call, put, takeLatest } from "redux-saga/effects";
import { Actions } from "./constant";
import { FilterType } from "../../models/todo.model";
import { TodoAction } from "./action";
import {
  AddTodoRequestAction,
  CheckTodoRequestAction,
  DeleteAllTodoRequestAction,
  DeleteCheckTodoRequestAction,
  DeleteTodoRequestAction,
  EditTodoRequestAction,
  GetCurrentTodoAction,
  LoadTodosAction,
} from "./action.types";
import { todoApi } from "../../service/todo.service";

function* fetchTodos(action: LoadTodosAction): any {
  try {
    const { data } = yield call(todoApi.getAllTodos);
    yield put(TodoAction.isLoading(false));
    yield put({ type: Actions.SetTodos, payload: { todos: data } });
    yield put(TodoAction.filterTodos(FilterType.ALL));
  } catch (e) {
    console.log(e);
  }
}

function* addTodo(action: AddTodoRequestAction): any {
  try {
    const { data } = yield call(todoApi.addTodo, action.payload);
    yield put(TodoAction.addTodoSuccess(data));
  } catch (e) {
    console.log(e);
  }
}

function* removeTodo(action: DeleteTodoRequestAction): any {
  try {
    yield call(todoApi.removeTodo, action.payload);
    yield put(TodoAction.deleteTodoSuccess(action.payload));
  } catch (e) {
    console.log(e);
  }
}

function* removeTodos(action: DeleteAllTodoRequestAction): any {
  try {
    console.log("All todo");
    yield call(todoApi.removeTodos, FilterType.ALL);
    yield put(TodoAction.deleteAllTodoSuccess());
  } catch (e) {
    console.log(e);
  }
}

function* editTodo(action: EditTodoRequestAction): any {
  try {
    yield call(todoApi.updateTodo, action.payload);
    yield put(TodoAction.editTodoSuccess(action.payload));
  } catch (e) {
    console.log(e);
  }
}

function* removeCheckTodos(action: DeleteCheckTodoRequestAction): any {
  try {
    console.log("Done todo");
    yield call(todoApi.removeTodos, FilterType.DONE);
    yield put(TodoAction.deleteCheckTodoSuccess());
  } catch (e) {
    console.log(e);
  }
}

function* checkTodo(action: CheckTodoRequestAction): any {
  try {
    yield call(todoApi.updateTodo, action.payload);
    yield put(TodoAction.checkTodoSuccess(action.payload));
  } catch (e) {
    console.log(e);
  }
}
function* getCurrentTodo(action: GetCurrentTodoAction): any {
  try {
    const { data } = yield call(todoApi.getTodo, action.payload);
    yield put(TodoAction.setCurrentTodo(data));
  } catch (e) {
    console.log(e);
  }
}

export function* watchGetListTodo() {
  yield takeLatest(Actions.LoadTodos, fetchTodos);
}
export function* watchAddTodo() {
  yield takeLatest(Actions.AddTodo_Request, addTodo);
}
export function* watchRemoveTodo() {
  yield takeLatest(Actions.DeleteTodo_Request, removeTodo);
}
export function* watchRemoveTodos() {
  yield takeLatest(Actions.DeleteAllTodo_Request, removeTodos);
}
export function* watchEditTodo() {
  yield takeLatest(Actions.EditTodo_Request, editTodo);
}
export function* watchRemoveCheckTodos() {
  yield takeLatest(Actions.DeleteCheckTodo_Request, removeCheckTodos);
}
export function* watchCheckTodo() {
  yield takeLatest(Actions.CheckTodo_Request, checkTodo);
}
export function* watchGetCurrentTodo() {
  yield takeLatest(Actions.GetCurrentTodo, getCurrentTodo);
}

export function* todoSaga() {
  yield all([
    watchAddTodo(),
    watchEditTodo(),
    watchCheckTodo(),
    watchRemoveTodo(),
    watchRemoveTodos(),
    watchGetListTodo(),
    watchGetCurrentTodo(),
    watchRemoveCheckTodos(),
  ]);
}
