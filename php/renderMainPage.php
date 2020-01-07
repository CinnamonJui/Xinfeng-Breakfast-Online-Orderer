<?php

function renderMainPage() {
    
        function generateCombo($combo_ID,$combo_price,$combo_items){
            
            $combo_items = preg_split('/,/', $combo_items,null, PREG_SPLIT_NO_EMPTY);
            $combo_items[0] = '<li>' . $combo_items[0];
            $combo_items[count($combo_items)-1] = $combo_items[count($combo_items)-1] . '</li>';
            $combo_items = implode('</li><li>',$combo_items);
            $ret = <<< COMBO
                <div class="combo">
                    <div class="title">$combo_ID</div>
                    <div class="content">
                        <ul>
                            $combo_items
                        </ul>
                    </div>
                    <div class="price">$combo_price</div>
                    <div class="toCart">
                        <button class="cart-minus">[-]</button>
                        <span>0</span>
                        <button class="cart-plus">[+]</button>
                    </div>
                </div>
            COMBO;
            return $ret;
        };
        function generateItem($item_name,$item_price){
            $ret = <<<ROW
                    <tr>
                        <td class="title">$item_name</td>
                        <td class="price">$item_price</td>
                        <td class="toCart">
                            <button class="cart-minus">[-]</button>
                            <span>0</span>
                            <button class="cart-plus">[+]</button>
                        </td>
                    </tr>
            ROW;
            return $ret;
        };
        $retHTML = <<<COMBO
        <button class="control"><span>套餐</span></button>
        <div class="combo-panel">
        COMBO;
        // combo
        /*$sql = 'SELECT `combo_ID`, `combo_price`, `combo_items` FROM `combo`';
        $queryResult = $this->conn->query($sql)->fetchAll();*/
        include_once("Bacon.php");
        $conn = new Bacon();
        $queryResult = $conn->getCombo();
        $queryResult = json_decode($queryResult,true);
        foreach ($queryResult as $row)
            $retHTML .= generateCombo($row['ID'], $row['price'], $row['items']);
        $retHTML .= <<<COMBOCLOSE
        </div>
        COMBOCLOSE;
        // item
        /*$sql = 'SELECT DISTINCT `item_type` 
                FROM `item`
                ORDER BY `item_type` ASC';
        $queryResult = $this->conn->query($sql)->fetchAll(PDO::FETCH_ASSOC);*/
        $types = '';
        $queryResult= $conn->getType();
        $queryResult = json_decode($queryResult,true);
        foreach($queryResult as $row)
            $types .= $row['type'] . ',';
        
        $types = preg_split('/,/',$types, null, PREG_SPLIT_NO_EMPTY);
        foreach ($types as $type) {
            $retHTML .= <<<ITEMOPEN
            <button class="control">$type</button>
                <div class="panel">
                    <table>
                        <tbody>
            ITEMOPEN;
            /*$sql = "SELECT  `item_name`, `item_price` FROM `item` WHERE `item_type` LIKE '$type'";
            $queryResult = $this->conn->query($sql)->fetchAll(PDO::FETCH_ASSOC);*/
            $queryResult = $conn->searchItem($type);
            $queryResult = json_decode($queryResult,true);
            foreach ($queryResult as $row)
                $retHTML .= generateItem($row['ID'],$row['price']);
            
            $retHTML .= <<<ITEMCLOSE
                        </tbody>
                    </table>
                </div>
            
            ITEMCLOSE;
        }
        return $retHTML;
    }