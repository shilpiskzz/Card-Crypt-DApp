// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WalmartGiftCardNFT is ERC721URIStorage, Ownable {
    struct GiftCardData {
        uint256 balance;
        uint256 expiry;
        bool redeemed;
        address originalOwner;  // ✅ NEW: store original recipient
    }

    mapping(uint256 => GiftCardData) public giftCards;
    mapping(uint256 => bool) public usedPreTokenIds;

    address public walmartAdmin;

    event GiftCardMinted(address indexed to, uint256 indexed tokenId, uint256 amount, uint256 expiry);
    event GiftCardRedeemed(address indexed from, uint256 indexed tokenId, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == walmartAdmin, "Not Walmart admin");
        _;
    }

    constructor(address _admin, address _initialOwner) ERC721("WalmartGiftCard", "WGC") Ownable(_initialOwner) {
        walmartAdmin = _admin;
    }

    function setAdmin(address _admin) external onlyOwner {
        walmartAdmin = _admin;
    }

    function mintNFT(
        address to,
        uint256 preTokenId,
        uint256 amount,
        uint256 expiry
    ) external onlyAdmin {
        require(!usedPreTokenIds[preTokenId], "PreTokenId already used");
        usedPreTokenIds[preTokenId] = true;

        _safeMint(to, preTokenId);

        giftCards[preTokenId] = GiftCardData({
            balance: amount,
            expiry: expiry,
            redeemed: false,
            originalOwner: to  // ✅ save original recipient
        });

        emit GiftCardMinted(to, preTokenId, amount, expiry);
    }

    function redeem(uint256 tokenId, uint256 amount) external {
        require(ownerOf(tokenId) == msg.sender, "Not current owner");

        GiftCardData storage card = giftCards[tokenId];

        // ✅ Enforce that ONLY the *original* minted address can redeem
        require(card.originalOwner == msg.sender, "Not original recipient");

        require(!card.redeemed, "Already fully redeemed");
        require(block.timestamp <= card.expiry, "Card expired");
        require(card.balance >= amount, "Insufficient balance");

        card.balance -= amount;

        if (card.balance == 0) {
            card.redeemed = true;
            _burn(tokenId);
        }

        emit GiftCardRedeemed(msg.sender, tokenId, amount);
    }
}
