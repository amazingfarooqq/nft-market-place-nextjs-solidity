// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./openzepplin/contracts/token/ERC721//IERC721.sol";
import "./openzepplin/contracts/security/ReentrancyGuard.sol";

contract NFTMarketplace is ReentrancyGuard {
    // Variables
    address payable public immutable feeAccount; // the account that receives fees
    uint256 public immutable feePercent; // the fee percentage on sales
    uint256 public itemCount;
    uint256 public totalItemsSold;
    address public nftContractAddress;

    struct MarketItem {
        uint256 itemId;
        IERC721 nft;
        uint256 tokenId;
        uint256 price;
        address payable seller;
        address payable owner;
        bool sold;
    }
    

    event Offered( uint256 itemId, address indexed nft, uint256 tokenId, uint256 price, address indexed seller );

    event Bought( uint256 itemId, address indexed nft, uint256 tokenId, uint256 price, address indexed seller, address indexed buyer );

    mapping(uint256 => MarketItem) public MarketItems;

    constructor(uint256 _feePercentage , address _nftContractAddress) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercentage;
        nftContractAddress = _nftContractAddress;
    }
    

    function createMarketItem( IERC721 _nft, uint256 _tokenId, uint256 _price ) public nonReentrant {
        require(_price > 0, "Price must be greater than zero");

        itemCount++;

        _nft.approve(address(this), _tokenId);
        _nft.transferFrom(msg.sender, address(this), _tokenId);

        MarketItems[itemCount] = MarketItem( itemCount, _nft, _tokenId, _price, payable(msg.sender), payable(address(this)), false );

        emit Offered(itemCount, address(_nft), _tokenId, _price, msg.sender);
    }

    function purchaseItem(uint256 _itemId) external payable nonReentrant {
        uint256 _totalPrice = getTotalPrice(_itemId);
        MarketItem storage item = MarketItems[_itemId];

        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        // require(MarketItems[_itemId].owner != address(0), "item doesn't exist");
        require(
            msg.value >= _totalPrice,
            "not enough ether to cover item price and market fee"
        );
        require(!item.sold, "item already sold");

        item.seller.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);
        item.sold = true;
        totalItemsSold++;

        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }

    function getTotalPrice(uint256 _itemId) public view returns (uint256) {
        return ((MarketItems[_itemId].price * (100 + feePercent)) / 100);
    }


    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 unsoldItemCount = itemCount - totalItemsSold;
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            if (MarketItems[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = MarketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
