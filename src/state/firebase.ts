import { atom } from "jotai";
import type { FirebaseApp } from "firebase/app";
import type { User } from "firebase/auth";
import { DatabaseTarget } from "@/types";

export const fbAppAtom = atom<FirebaseApp>();

export const fbDatabaseTargetAtom = atom<DatabaseTarget>(DatabaseTarget.Prod);

export const fbUserAtom = atom<User | null>();

export const authLoadingAtom = atom(false);