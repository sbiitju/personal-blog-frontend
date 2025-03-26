"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Swal from "sweetalert2"

import { useBlockUser, useDeleteUser, useGetAllUsers } from "@/hooks/admin.hook"

// Define proper types for the user data
interface User {
  _id: string
  name: string
  email: string
  domain: string
  user: {
    _id : string
    role: string
    isDeleted: boolean
    isBlocked: boolean
  }
  position?: string
  phone?: string
  socialLinks?: {
    facebook?: string
    youtube?: string
    instagram?: string
    twitter?: string
  }
}

const GetAllUsers = () => {
  const { data: contentData, isLoading, isError, refetch } = useGetAllUsers()
  const { mutate: deleteUser, isSuccess: isDeleting } = useDeleteUser()
  const { mutate: blockUser, isSuccess: isBlocking } = useBlockUser()

  // Initialize with empty array and update when data is available
  const [contents, setContents] = useState<User[]>([])

  // Update state when data changes
  useEffect(() => {
    if (contentData?.data) {
      setContents(contentData.data)
    }
  }, [contentData])

  // Handle content delete confirmation
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to toggle the delete status of this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id, {
          onSuccess: () => {
            Swal.fire({
              title: "Success!",
              text: "User delete status has been updated.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            })
            refetch() // Refresh the data to show updated status
          },
          onError: (error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to update user status. Please try again.",
              icon: "error",
            })
            console.error("Delete error:", error)
          },
        })
      }
    })
  }
  const handleBlock = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to change the block status of this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        blockUser(id, {
          onSuccess: () => {
            Swal.fire({
              title: "Success!",
              text: "User block status has been updated.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            })
            refetch() // Refresh the data
          },
          onError: (error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to update user status. Please try again.",
              icon: "error",
            })
            console.error("Block error:", error)
          },
        })
      }
    })
  }

  // Function to retry loading data
  const handleRetry = () => {
    refetch()
  }

  return (
    <div className="w-full px-4 py-6 space-y-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h2 className="text-2xl font-semibold">All Users</h2>
        <Button variant="outline" onClick={handleRetry} disabled={isLoading} className="self-end">
          Refresh
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-4">
          <LoadingUserTable />
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <span>Failed to load users. Please try again later.</span>
            <Button variant="outline" size="sm" onClick={handleRetry} className="self-start">
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && !isError && (
        <div className="overflow-x-auto rounded-lg border bg-card">
          <Table>
            <TableCaption>List of all Users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-center">No.</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Domain</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center w-[150px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.length > 0 ? (
                contents.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell className="text-center font-medium">{index + 1}</TableCell>
                    <TableCell className="text-center font-medium">{user.name || "N/A"}</TableCell>
                    <TableCell className="text-center">{user.email || "N/A"}</TableCell>
                    <TableCell className="text-center">{user.domain || "N/A"}</TableCell>
                    <TableCell className="text-center">{user.user?.role || "N/A"}</TableCell>
                    <TableCell className="text-center">
                      {user.user?.isBlocked ? (
                        <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                          Blocked
                        </span>
                      ) : user.user?.isDeleted ? (
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                          Deleted
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                          Active
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(user?.user?._id)}
                        disabled={isDeleting}
                        className="gap-1 cursor-pointer mr-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only">{user.user?.isDeleted ? "Restore" : "Delete"}</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBlock(user?.user?._id)}
                        disabled={isBlocking}
                        className="gap-1 cursor-pointer"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only">{user.user?.isBlocked ? "Unblock" : "Block"}</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

// Loading skeleton for the user table
const LoadingUserTable = () => (
  <div className="overflow-x-auto rounded-lg border bg-card">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[150px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 3 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-6 w-6 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-24 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-32 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-20 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-20 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-20 rounded-md" />
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-20 rounded-md" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

export default GetAllUsers

