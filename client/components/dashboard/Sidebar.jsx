"use client";
import React from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";
import { userProfile } from "@/config/Variables";

const Sidebar = () => {
  let { user } = useSelector((state) => state.user);

  return (
    <aside className="bg-gray-700 text-white h-screen px-4 pt-20 space-y-6 w-64 sm:sticky top-0 left-0">
      <Link href="/admin/dashboard">
        <div className="flex justify-center items-center">
          <Image
            width="100"
            height="100"
            className="rounded-full"
            src={userProfile}
            alt="user-profile"
          />
        </div>
        <div className="text-center capitalize space-y-2">
          <p className="text-2xl font-bold">{user?.name}</p>
          <p className="satoshi_medium">VP Fancy Admin</p>
        </div>
      </Link>

      {/* Links */}
      <div className="satoshi_medium">
        {/* Products Tree View */}
        <div>
          <SimpleTreeView defaultExpandedItems={["Products"]}>
            <TreeItem
              itemId="Products"
              label="Products"
              className="text-lg font-medium"
            >
              <Link href="/admin/products">
                <TreeItem
                  itemId="All"
                  label="All"
                  className="pl-4 text-sm transition duration-200"
                />
              </Link>
              <Link href="/admin/product/create">
                <TreeItem
                  itemId="Create"
                  label="Create"
                  className="pl-4 text-sm transition duration-200"
                />
              </Link>
            </TreeItem>
          </SimpleTreeView>
        </div>

        <div className="flex flex-col gap-y-4 mt-3">
          <Link href="/admin/orders">
            <i className="ri-shopping-bag-4-line text-xl pr-3"></i> Orders
          </Link>
          <Link href="/admin/users">
            <i className="ri-user-3-line text-xl pr-3"></i> Users
          </Link>
          <Link href="/admin/reviews">
            <i className="ri-star-line text-xl pr-3"></i> Reviews
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
