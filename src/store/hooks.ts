import {  useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// بدل useDispatch العادي
export const useAppDispatch = () => useDispatch<AppDispatch>();

// بدل useSelector العادي
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;