**Best solidity security practices with provide sources**
Here are some best practices for writing secure Solidity code:

1. Use the latest version of Solidity: The Solidity team regularly releases updates that fix vulnerabilities and improve the language. Make sure to use the latest version to take advantage of these improvements.

2. Use a secure coding style: Follow the Solidity style guide and use established patterns, such as the OpenZeppelin library, to ensure your code is clean and easy to understand.

3. Use type checking: Solidity is a dynamically-typed language, which means that variables don't have a fixed type. This can lead to bugs if you pass the wrong type of data to a function. Use type checking to ensure that the correct types of data are being passed to functions.

4. Use input validation: Validate all input data to ensure that it is the correct type and format. This will prevent attackers from passing invalid data to your contract.

5. Use exception handling: Use try-catch blocks to handle exceptions and revert the transaction if an exception is thrown. This will prevent the contract from entering an invalid state.

6. Use security tools: There are several tools available that can help you find vulnerabilities in your Solidity code. Some examples include Mythril, Oyente, and Securify.

7. Test thoroughly: Test your contract thoroughly using both unit tests and integration tests. This will help you catch any bugs or vulnerabilities before deploying to the main network.

Here are some additional resources that provide more information on writing secure Solidity code:

The Solidity documentation: https://solidity.readthedocs.io/en/latest/security-considerations.html
The OpenZeppelin documentation: https://docs.openzeppelin.com/learn/security-considerations
ConsenSys' "Smart Contract Best Practices" guide: https://consensys.github.io/smart-contract-best-practices/