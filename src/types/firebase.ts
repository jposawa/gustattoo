import type { UserMetadata } from "firebase/auth";

export type FirebaseConfig = {
	apiKey: string;
	authDomain: string;
	databaseURL: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
};

export enum DatabaseTarget {
	Test = "dev",
	Prod = "prod",
}

export type UserDatabase = {
	uid: string;
	emailVerified: boolean;
	metadata: UserMetadata;
	displayName?: string | null;
	email?: string | null;
	photoUrl?: string | null;
};