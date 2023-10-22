import type { RootState, AppDispatch } from "./store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { isNil } from "lodash/fp";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useInitialRoute = () => {
  const navigate = useNavigate();
  const { data } = useAppSelector((state) => state.session);

  const isNotLoggedIn = isNil(data);

  useEffect(() => {
    if (isNotLoggedIn) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, [navigate, isNotLoggedIn]);
};

export const useRedirectIfNotLoggedIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useAppSelector((state) => state.session);

  const currentPathname = location.pathname;
  const isNotLoggedIn = isNil(data);

  useEffect(() => {
    if (isNotLoggedIn && currentPathname !== "/login") {
      navigate("/login");
    }
  }, [navigate, currentPathname, isNotLoggedIn]);
};

export const useRedirectIfLoggedIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useAppSelector((state) => state.session);

  const currentPathname = location.pathname;
  const isLoggedIn = !isNil(data);

  useEffect(() => {
    if (isLoggedIn && currentPathname !== "/dashboard") {
      navigate("/dashboard");
    }
  }, [navigate, currentPathname, isLoggedIn]);
};

export const useRedirectIfNotStaff = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useAppSelector((state) => state.session);

  const currentPathname = location.pathname;
  const isNotStaff = isNil(data?.tokenAuth.user.staff);

  useEffect(() => {
    if (isNotStaff && currentPathname !== "/dashboard") {
      navigate("/dashboard");
    }
  }, [navigate, currentPathname, isNotStaff]);
};
