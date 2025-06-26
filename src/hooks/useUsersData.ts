import { useState, useEffect } from "react";
import {
  fetchUsers,
  updateUserPlan,
  updateUserStatus,
  User,
  UserPlan,
  UserStatus,
} from "@/services/usersService";

export interface UseUsersDataResult {
  users: User[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  totalItems: number;
  handleStatusChange: (userId: string, newStatus: UserStatus) => Promise<void>;
  handlePlanChange: (userId: string, newPlan: UserPlan) => Promise<void>;
}

export function useUsersData(
  currentPage: number,
  itemsPerPage: number,
  searchQuery: string = ""
): UseUsersDataResult {
  const page = currentPage;
  const perPage = itemsPerPage;
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const handleStatusChange = async (userId: string, newStatus: UserStatus) => {
    try {
      setIsLoading(true);
      await updateUserStatus(userId, newStatus);
      setUsers((prev) =>
        prev.map((user) =>
          user.user_id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanChange = async (userId: string, newPlan: UserPlan) => {
    try {
      setIsLoading(true);

      await updateUserPlan(userId, newPlan);
      setUsers((prev) =>
        prev.map((user) =>
          user.user_id === userId ? { ...user, plan: newPlan } : user
        )
      );
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const params: Record<string, string | number | undefined> = {
      limit: perPage,
      offset: (page - 1) * perPage,
      search: searchQuery || undefined,
    };

    fetchUsers(params)
      .then((res) => {
        setUsers(res.users);
        setTotalItems(res.metadata.total);
        setTotalPages(Math.ceil(res.metadata.total / perPage));
      })
      .catch((err) => {
        setError(
          err?.response?.data?.error || err?.message || "Failed to fetch users"
        );
        setUsers([]);
        setTotalItems(0);
        setTotalPages(1);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, perPage, searchQuery]);

  return {
    users,
    isLoading,
    error,
    totalPages,
    totalItems,
    handlePlanChange,
    handleStatusChange,
  };
}
