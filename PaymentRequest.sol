// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentRequest {
    struct Request {
        address requester;
        uint256 amount;
        bool approved;
    }

    mapping(address => Request[]) public requests;

    event RequestCreated(address indexed requester, address indexed owner, uint256 amount);
    event RequestApproved(address indexed owner, uint256 requestIndex);

    function createRequest(address owner, uint256 amount) external {
        requests[owner].push(Request(msg.sender, amount, false));
        emit RequestCreated(msg.sender, owner, amount);
    }

    function approveRequest(uint256 requestIndex) external payable {
        require(requestIndex < requests[msg.sender].length, "Invalid request");
        Request storage request = requests[msg.sender][requestIndex];
        require(!request.approved, "Already approved");
        require(msg.value == request.amount, "Send exact amount");

        request.approved = true;
        payable(request.requester).transfer(msg.value);
        emit RequestApproved(msg.sender, requestIndex);
    }

    function getRequests(address owner) external view returns (Request[] memory) {
        return requests[owner];
    }
}
